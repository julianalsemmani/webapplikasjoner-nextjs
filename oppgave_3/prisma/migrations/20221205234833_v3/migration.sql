/*
  Warnings:

  - You are about to drop the column `employeeNum` on the `Overwrites` table. All the data in the column will be lost.
  - Added the required column `employeeId` to the `Overwrites` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Overwrites" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "weekId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    CONSTRAINT "Overwrites_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "Week" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Overwrites_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Overwrites" ("id", "weekId") SELECT "id", "weekId" FROM "Overwrites";
DROP TABLE "Overwrites";
ALTER TABLE "new_Overwrites" RENAME TO "Overwrites";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;