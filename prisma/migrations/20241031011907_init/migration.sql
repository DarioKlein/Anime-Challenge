-- CreateTable
CREATE TABLE "Anime" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "releaseDate" INTEGER NOT NULL,
    "episodes" INTEGER NOT NULL,
    "studio" TEXT NOT NULL,
    "popularity" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL
);
