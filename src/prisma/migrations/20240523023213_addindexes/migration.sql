/*
  Warnings:

  - Made the column `postId` on table `Attachments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Posts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postId` on table `Replies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Replies` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Attachments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,
    CONSTRAINT "Attachments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Attachments" ("id", "name", "path", "postId", "size") SELECT "id", "name", "path", "postId", "size" FROM "Attachments";
DROP TABLE "Attachments";
ALTER TABLE "new_Attachments" RENAME TO "Attachments";
CREATE INDEX "Attachments_postId_idx" ON "Attachments"("postId");
CREATE TABLE "new_Posts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Posts" ("content", "createdAt", "id", "title", "updatedAt", "userId") SELECT "content", "createdAt", "id", "title", "updatedAt", "userId" FROM "Posts";
DROP TABLE "Posts";
ALTER TABLE "new_Posts" RENAME TO "Posts";
CREATE INDEX "Posts_userId_idx" ON "Posts"("userId");
CREATE INDEX "Posts_createdAt_idx" ON "Posts"("createdAt");
CREATE INDEX "Posts_title_idx" ON "Posts"("title");
CREATE TABLE "new_Replies" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    CONSTRAINT "Replies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Replies_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Replies" ("content", "createdAt", "id", "postId", "updatedAt", "userId") SELECT "content", "createdAt", "id", "postId", "updatedAt", "userId" FROM "Replies";
DROP TABLE "Replies";
ALTER TABLE "new_Replies" RENAME TO "Replies";
CREATE INDEX "Replies_postId_idx" ON "Replies"("postId");
CREATE INDEX "Replies_createdAt_idx" ON "Replies"("createdAt");
PRAGMA foreign_key_check("Attachments");
PRAGMA foreign_key_check("Posts");
PRAGMA foreign_key_check("Replies");
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE INDEX "email_index" ON "Users"("email");

-- CreateIndex
CREATE INDEX "Users_role_idx" ON "Users"("role");
