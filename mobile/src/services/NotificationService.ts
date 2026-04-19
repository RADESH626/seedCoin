import Constants, { ExecutionEnvironment } from 'expo-constants';
import { Platform } from 'react-native';
import { log } from './logger';

/**
 * Service to manage notifications safely across different environments.
 * Avoids the 'expo-notifications' crash in Expo Go (Android/SDK 53+).
 */
export const NotificationService = {
  isExpoGo: Constants.executionEnvironment === ExecutionEnvironment.StoreClient,

  /**
   * Initializes notification settings if the environment supports it.
   */
  async initialize(): Promise<void> {
    if (this.isExpoGo && Platform.OS === 'android') {
      log.warn('NotificationService: Notifications are disabled in Expo Go (Android) to prevent crashes.');
      return;
    }

    try {
      const Notifications = await import('expo-notifications');
      
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
          shouldShowBanner: true,
          shouldShowList: true,
        }),
      });

      log.info('NotificationService: Notifications initialized correctly.');
    } catch (error) {
      log.error('NotificationService: Error initializing notifications:', error);
    }
  },

  /**
   * Requests notification permissions if supported.
   */
  async requestPermissions(): Promise<boolean> {
    if (this.isExpoGo && Platform.OS === 'android') return false;

    try {
      const Notifications = await import('expo-notifications');
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      return finalStatus === 'granted';
    } catch (error) {
      log.error('NotificationService: Error requesting permissions:', error);
      return false;
    }
  },

  /**
   * Schedules a local notification.
   */
  async scheduleNotification(title: string, body: string, data?: Record<string, any>): Promise<string | undefined> {
    if (this.isExpoGo && Platform.OS === 'android') {
      log.info(`NotificationService: [Expo Go Simulation] Notification: ${title} - ${body}`);
      return undefined;
    }

    try {
      const Notifications = await import('expo-notifications');
      return await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data: data || {},
        },
        trigger: null, // Immediate
      });
    } catch (error) {
      log.error('NotificationService: Error scheduling notification:', error);
      return undefined;
    }
  }
};
