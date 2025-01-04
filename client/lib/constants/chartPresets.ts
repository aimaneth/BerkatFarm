import { COLORS } from './theme';

export const CHART_PRESETS = {
  line: {
    stroke: COLORS.primary,
    strokeWidth: 2,
    dot: {
      fill: COLORS.primary,
      radius: 4
    },
    activeDot: {
      r: 6,
      fill: COLORS.primary
    },
    animate: true,
    animationDuration: 750
  },
  bar: {
    fill: COLORS.primary,
    radius: [4, 4, 0, 0],
    animate: true,
    animationDuration: 750
  },
  pie: {
    innerRadius: '60%',
    outerRadius: '80%',
    paddingAngle: 5,
    animate: true,
    animationDuration: 750,
    colors: [COLORS.success, COLORS.secondary, COLORS.primary, COLORS.warning]
  },
  common: {
    grid: {
      strokeDasharray: '3 3',
      stroke: '#E5E7EB'
    },
    axis: {
      stroke: '#9CA3AF',
      fontSize: 12
    },
    legend: {
      fontSize: 12,
      iconSize: 10,
      iconType: 'circle'
    }
  },
  export: {
    filename: 'chart-data',
    formats: {
      csv: true,
      png: true,
      svg: true
    }
  }
} as const; 