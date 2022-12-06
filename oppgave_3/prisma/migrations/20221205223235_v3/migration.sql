-- CreateTable
CREATE TABLE "Overwrites" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "weekId" TEXT NOT NULL,
    CONSTRAINT "Overwrites_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "Week" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_DayToOverwrites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_DayToOverwrites_A_fkey" FOREIGN KEY ("A") REFERENCES "Day" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DayToOverwrites_B_fkey" FOREIGN KEY ("B") REFERENCES "Overwrites" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_DayToOverwrites_AB_unique" ON "_DayToOverwrites"("A", "B");

-- CreateIndex
CREATE INDEX "_DayToOverwrites_B_index" ON "_DayToOverwrites"("B");
