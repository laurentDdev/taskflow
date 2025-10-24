import type { ReceivedNotification } from "@/types/Notification";
import api from "@/lib/api";
class NotificationApi {
  private readonly baseUrl = "/api/notification";

  async getNotifications(): Promise<ReceivedNotification[]> {
    return api.get(this.baseUrl).then((response) => response.data);
  }
}

export default new NotificationApi();
