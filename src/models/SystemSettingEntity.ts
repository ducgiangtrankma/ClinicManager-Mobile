export interface SystemSettingEntity {
  iosNewVersion: {
    version: string;
    urlUpdate: string;
  };
  androidNewVersion: {
    version: string;
    urlUpdate: string;
  };
  enableAds: boolean;
  enableIAP: boolean;
  systemMaintenance: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
  appInReview: boolean;
}
export interface SystemSettingState {
  iosNewVersion: {
    version: string;
    urlUpdate: string;
  } | null;
  androidNewVersion: {
    version: string;
    urlUpdate: string;
  } | null;
  enableAds: boolean | null;
  enableIAP: boolean | null;
  systemMaintenance: boolean | null;
  createdAt: string | null;
  updatedAt: string | null;
  id: string | null;
  appInReview: boolean;
}
