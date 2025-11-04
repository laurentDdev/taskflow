// model User {
//   id                    String            @id
//   username              String            @db.Text
//   email                 String
//   emailVerified         Boolean           @default(false)
//   avatar                String?           @db.Text
//   createdAt             DateTime          @default(now())
//   updatedAt             DateTime          @default(now()) @updatedAt
//   sessions              Session[]
//   accounts              Account[]
//   sentNotifications     Notification[]    @relation("SentNotifications")
//   receivedNotifications Notification[]    @relation("ReceivedNotifications")
//   WorkspaceInvite       WorkspaceInvite[]
//   WorkspaceMember       WorkspaceMember[]

//   @@unique([email])
//   @@map("user")
// }

export type User = {
  id: string;
  name: string;
  email?: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};
