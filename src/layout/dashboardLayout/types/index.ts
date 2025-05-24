export interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export interface HeaderProps {
  setShowSlider: (show: boolean) => void;
}

export interface ChatboxProps {
  showSlider: boolean;
  setShowSlider: (show: boolean) => void;
}

export interface SidebarProps {
  // Add any sidebar specific props
}

export interface NavHeaderProps {
  // Add any nav header specific props
}

export interface FooterProps {
  // Add any footer specific props
}

// Dashboard page types
export interface DashboardPageProps {
  title: string;
  description?: string;
} 