export enum WidgetType {
  BAR_CHART = 'bar_chart',
  LINE_CHART = 'line_chart',
  PIE_CHART = 'pie_chart',
  SCATTER_PLOT = 'scatter_plot',
}

export interface WidgetDefinition {
  widget_name: string;
  widget_type: WidgetType;
  group_by: string;
  metrics: string[];
  sort_order?: 'asc' | 'desc' | null;
  limit?: number | null;
}

export interface SeriesData {
  label: string;
  id: string | null;
  value: string;
  metadata?: Record<string, unknown> | null;
}

export interface Series {
  label: string;
  id: string | null;
  data: SeriesData[];
}

export interface ScoreVisualizationData {
  definition: WidgetDefinition;
  series: Series[];
}
