import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type NotificationCategory = 'system' | 'task' | 'livestock' | 'inventory' | 'order' | 'finance';
export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface NotificationAction {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'destructive' | 'outline';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  category: NotificationCategory;
  priority: NotificationPriority;
  timestamp: Date;
  isRead: boolean;
  link?: string;
  groupId?: string;
  actions?: NotificationAction[];
  sound?: 'default' | 'success' | 'warning' | 'error';
}

export interface NotificationGroup {
  id: string;
  notifications: Notification[];
  category: NotificationCategory;
  timestamp: Date;
}

interface NotificationPreferences {
  enableSound: boolean;
  enableEmail: boolean;
  doNotDisturb: boolean;
  categories: {
    [K in NotificationCategory]: {
      enabled: boolean;
      email: boolean;
      minPriority: NotificationPriority;
    };
  };
}

interface NotificationStore {
  notifications: Notification[];
  preferences: NotificationPreferences;
  unreadCount: number;
  groups: NotificationGroup[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  updatePreferences: (preferences: Partial<NotificationPreferences>) => void;
  getGroupedNotifications: () => NotificationGroup[];
}

const defaultPreferences: NotificationPreferences = {
  enableSound: true,
  enableEmail: false,
  doNotDisturb: false,
  categories: {
    system: { enabled: true, email: true, minPriority: 'low' },
    task: { enabled: true, email: true, minPriority: 'medium' },
    livestock: { enabled: true, email: true, minPriority: 'medium' },
    inventory: { enabled: true, email: false, minPriority: 'high' },
    order: { enabled: true, email: true, minPriority: 'medium' },
    finance: { enabled: true, email: true, minPriority: 'high' },
  },
};

export const useNotifications = create<NotificationStore>()(
  persist(
    (set, get) => ({
      notifications: [],
      preferences: defaultPreferences,
      unreadCount: 0,
      groups: [],

      addNotification: (notification) => {
        const { preferences } = get();
        const categoryPrefs = preferences.categories[notification.category];

        if (!categoryPrefs.enabled) return;
        if (preferences.doNotDisturb && notification.priority !== 'urgent') return;

        const newNotification: Notification = {
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date(),
          isRead: false,
          ...notification,
        };

        set((state) => {
          const notifications = [newNotification, ...state.notifications];
          const groups = groupNotifications(notifications);
          return {
            notifications,
            groups,
            unreadCount: state.unreadCount + 1,
          };
        });

        // Play sound if enabled
        if (preferences.enableSound && notification.sound) {
          playNotificationSound(notification.sound);
        }

        // Send email if enabled for this category
        if (preferences.enableEmail && categoryPrefs.email) {
          // TODO: Send email notification
        }
      },

      markAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, isRead: true } : n
          ),
          unreadCount: state.unreadCount - 1,
        }));
      },

      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
          unreadCount: 0,
        }));
      },

      removeNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
          unreadCount: state.notifications.find((n) => n.id === id)?.isRead
            ? state.unreadCount
            : state.unreadCount - 1,
        }));
      },

      clearAll: () => {
        set({ notifications: [], unreadCount: 0 });
      },

      updatePreferences: (newPreferences) => {
        set((state) => ({
          preferences: {
            ...state.preferences,
            ...newPreferences,
          },
        }));
      },

      getGroupedNotifications: () => {
        const { notifications } = get();
        return groupNotifications(notifications);
      },
    }),
    {
      name: 'notifications-storage',
    }
  )
);

// Helper function to group notifications
function groupNotifications(notifications: Notification[]): NotificationGroup[] {
  const groups: { [key: string]: NotificationGroup } = {};

  notifications.forEach((notification) => {
    if (notification.groupId) {
      if (!groups[notification.groupId]) {
        groups[notification.groupId] = {
          id: notification.groupId,
          notifications: [],
          category: notification.category,
          timestamp: notification.timestamp,
        };
      }
      groups[notification.groupId].notifications.push(notification);
    }
  });

  return Object.values(groups).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

// Helper function to play notification sounds
function playNotificationSound(sound: string) {
  const audio = new Audio(`/sounds/${sound}.mp3`);
  audio.play().catch((error) => console.error('Failed to play notification sound:', error));
} 