-- CreateTable
CREATE TABLE "BlogThumbnail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "buffer" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "blogId" INTEGER NOT NULL,
    "fileName" TEXT NOT NULL,
    "location" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Blog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "thumbnailId" INTEGER,
    CONSTRAINT "Blog_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Blog_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "BlogThumbnail" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Blog" ("authorId", "content", "createdAt", "id", "published", "title", "updatedAt") SELECT "authorId", "content", "createdAt", "id", "published", "title", "updatedAt" FROM "Blog";
DROP TABLE "Blog";
ALTER TABLE "new_Blog" RENAME TO "Blog";
CREATE UNIQUE INDEX "Blog_thumbnailId_key" ON "Blog"("thumbnailId");
PRAGMA foreign_key_check("Blog");
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "BlogThumbnail_blogId_key" ON "BlogThumbnail"("blogId");
