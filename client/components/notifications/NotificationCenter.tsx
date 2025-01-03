import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import {
  BellIcon,
  CheckIcon,
  TrashIcon,
  FunnelIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useNotifications, type NotificationCategory, type NotificationPriority, type Notification, type NotificationGroup } from '@/hooks/useNotifications';
import { formatDistanceToNow } from 'date-fns';

export function NotificationCenter() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    getGroupedNotifications
  } = useNotifications();

  const [selectedTab, setSelectedTab] = useState<'all' | 'unread' | 'preferences'>('all');
  const [categoryFilter, setCategoryFilter] = useState<NotificationCategory | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<NotificationPriority | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotifications = notifications.filter((notification: Notification) => {
    if (selectedTab === 'unread' && notification.isRead) return false;
    if (categoryFilter !== 'all' && notification.category !== categoryFilter) return false;
    if (priorityFilter !== 'all' && notification.priority !== priorityFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        notification.title.toLowerCase().includes(query) ||
        notification.message.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const groupedNotifications = getGroupedNotifications().filter((group: NotificationGroup) => {
    if (categoryFilter !== 'all' && group.category !== categoryFilter) return false;
    if (searchQuery) {
      return group.notifications.some(
        (n: Notification) =>
          n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          n.message.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  return (
    <Card className="w-[380px] p-4 bg-white shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BellIcon className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold">Notifications</h2>
          {unreadCount > 0 && (
            <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {selectedTab !== 'preferences' && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs"
              >
                <CheckIcon className="h-4 w-4 mr-1" />
                Mark all read
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={clearAll}
                className="text-xs"
              >
                <TrashIcon className="h-4 w-4 mr-1" />
                Clear all
              </Button>
            </>
          )}
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={(value: string) => setSelectedTab(value as 'all' | 'unread' | 'preferences')}>
        <TabsList className="w-full mb-4">
          <TabsTrigger value="all" className="flex-1">
            All
          </TabsTrigger>
          <TabsTrigger value="unread" className="flex-1">
            Unread
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex-1">
            Preferences
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Select value={categoryFilter} onValueChange={(value: NotificationCategory | 'all') => setCategoryFilter(value)}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="task">Tasks</SelectItem>
                  <SelectItem value="livestock">Livestock</SelectItem>
                  <SelectItem value="inventory">Inventory</SelectItem>
                  <SelectItem value="order">Orders</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={(value: NotificationPriority | 'all') => setPriorityFilter(value)}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No notifications found
                </div>
              ) : (
                <>
                  {/* Display grouped notifications first */}
                  {groupedNotifications.map((group: NotificationGroup) => (
                    <NotificationGroup key={group.id} group={group} />
                  ))}

                  {/* Display ungrouped notifications */}
                  {filteredNotifications
                    .filter((n: Notification) => !n.groupId)
                    .map((notification: Notification) => (
                      <NotificationCard key={notification.id} notification={notification} />
                    ))}
                </>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="unread">
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {notifications.filter((n: Notification) => !n.isRead).length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No unread notifications
              </div>
            ) : (
              notifications
                .filter((n: Notification) => !n.isRead)
                .map((notification: Notification) => (
                  <div
                    key={notification.id}
                    className="p-3 rounded-lg border bg-white"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-medium">{notification.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-gray-400">
                            {formatDistanceToNow(new Date(notification.timestamp), {
                              addSuffix: true,
                            })}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium
                              ${
                                notification.priority === 'urgent'
                                  ? 'bg-red-100 text-red-800'
                                  : notification.priority === 'high'
                                  ? 'bg-orange-100 text-orange-800'
                                  : notification.priority === 'medium'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-blue-100 text-blue-800'
                              }
                            `}
                          >
                            {notification.priority}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {notification.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="h-8 w-8 p-0"
                        >
                          <CheckIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeNotification(notification.id)}
                          className="h-8 w-8 p-0"
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="preferences">
          <NotificationPreferences />
        </TabsContent>
      </Tabs>
    </Card>
  );
}

function NotificationPreferences() {
  const { preferences, updatePreferences } = useNotifications();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={preferences.enableSound}
            onChange={(e) =>
              updatePreferences({ enableSound: e.target.checked })
            }
            className="rounded border-gray-300"
          />
          Enable notification sounds
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={preferences.enableEmail}
            onChange={(e) =>
              updatePreferences({ enableEmail: e.target.checked })
            }
            className="rounded border-gray-300"
          />
          Enable email notifications
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={preferences.doNotDisturb}
            onChange={(e) =>
              updatePreferences({ doNotDisturb: e.target.checked })
            }
            className="rounded border-gray-300"
          />
          Do not disturb (except urgent)
        </label>
      </div>

      <div className="space-y-3">
        <h3 className="font-medium">Category Preferences</h3>
        {Object.entries(preferences.categories).map(([category, prefs]) => (
          <div key={category} className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={prefs.enabled}
                  onChange={(e) =>
                    updatePreferences({
                      categories: {
                        ...preferences.categories,
                        [category]: {
                          ...prefs,
                          enabled: e.target.checked,
                        },
                      },
                    })
                  }
                  className="rounded border-gray-300"
                />
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </label>
              {prefs.enabled && (
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={prefs.email}
                      onChange={(e) =>
                        updatePreferences({
                          categories: {
                            ...preferences.categories,
                            [category]: {
                              ...prefs,
                              email: e.target.checked,
                            },
                          },
                        })
                      }
                      className="rounded border-gray-300"
                    />
                    Email
                  </label>
                  <Select
                    value={prefs.minPriority}
                    onValueChange={(value: NotificationPriority) =>
                      updatePreferences({
                        categories: {
                          ...preferences.categories,
                          [category]: {
                            ...prefs,
                            minPriority: value,
                          },
                        },
                      })
                    }
                  >
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Min Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationCard({ notification }: { notification: Notification }) {
  const { markAsRead, removeNotification } = useNotifications();

  return (
    <div
      className={`p-3 rounded-lg border ${
        notification.isRead ? 'bg-gray-50' : 'bg-white'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium">{notification.title}</h3>
            {!notification.isRead && (
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-gray-400">
              {formatDistanceToNow(new Date(notification.timestamp), {
                addSuffix: true,
              })}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium
                ${
                  notification.priority === 'urgent'
                    ? 'bg-red-100 text-red-800'
                    : notification.priority === 'high'
                    ? 'bg-orange-100 text-orange-800'
                    : notification.priority === 'medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-blue-100 text-blue-800'
                }
              `}
            >
              {notification.priority}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium
                ${
                  notification.category === 'system'
                    ? 'bg-purple-100 text-purple-800'
                    : notification.category === 'task'
                    ? 'bg-blue-100 text-blue-800'
                    : notification.category === 'livestock'
                    ? 'bg-green-100 text-green-800'
                    : notification.category === 'inventory'
                    ? 'bg-yellow-100 text-yellow-800'
                    : notification.category === 'order'
                    ? 'bg-orange-100 text-orange-800'
                    : 'bg-red-100 text-red-800'
                }
              `}
            >
              {notification.category}
            </span>
          </div>
          {notification.actions && notification.actions.length > 0 && (
            <div className="flex items-center gap-2 mt-3">
              {notification.actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant === 'destructive' ? 'ghost' : (action.variant || 'outline')}
                  size="sm"
                  onClick={action.onClick}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1">
          {!notification.isRead && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => markAsRead(notification.id)}
              className="h-8 w-8 p-0"
            >
              <CheckIcon className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeNotification(notification.id)}
            className="h-8 w-8 p-0"
          >
            <XMarkIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function NotificationGroup({ group }: { group: NotificationGroup }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-sm font-medium text-gray-500">
          {group.notifications.length} notifications
        </h3>
        <span className="text-xs text-gray-400">
          {formatDistanceToNow(new Date(group.timestamp), {
            addSuffix: true,
          })}
        </span>
      </div>
      {group.notifications.map((notification: Notification) => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
    </div>
  );
} 