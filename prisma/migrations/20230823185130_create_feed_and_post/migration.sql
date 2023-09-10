-- CreateTable
CREATE TABLE "Feed" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "fetchedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "publishedAt" DATETIME NOT NULL,
    "readAt" DATETIME,
    "url" TEXT NOT NULL,
    "feedId" INTEGER NOT NULL,
    CONSTRAINT "Post_feedId_fkey" FOREIGN KEY ("feedId") REFERENCES "Feed" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
