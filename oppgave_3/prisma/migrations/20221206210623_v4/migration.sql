/*
  Warnings:

  - You are about to drop the `_DayToOverwrites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `weekId` on the `Overwrites` table. All the data in the column will be lost.
  - Added the required column `dayId` to the `Overwrites` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_DayToOverwrites_B_index";

-- DropIndex
DROP INDEX "_DayToOverwrites_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_DayToOverwrites";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Overwrites" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dayId" TEXT NOT NULL,
    "employeeNum" INTEGER NOT NULL,
    CONSTRAINT "Overwrites_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Day" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Overwrites_employeeNum_fkey" FOREIGN KEY ("employeeNum") REFERENCES "Employee" ("employeeNum") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Overwrites" ("employeeNum", "id") SELECT "employeeNum", "id" FROM "Overwrites";
DROP TABLE "Overwrites";
ALTER TABLE "new_Overwrites" RENAME TO "Overwrites";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
