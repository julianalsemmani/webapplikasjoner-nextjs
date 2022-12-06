/*
  Warnings:

  - You are about to drop the `_EmployeeToOverwrites` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `employeeNum` to the `Overwrites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weekId` to the `Overwrites` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_EmployeeToOverwrites_B_index";

-- DropIndex
DROP INDEX "_EmployeeToOverwrites_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_EmployeeToOverwrites";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Overwrites" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "weekId" TEXT NOT NULL,
    "employeeNum" INTEGER NOT NULL,
    CONSTRAINT "Overwrites_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "Week" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Overwrites_employeeNum_fkey" FOREIGN KEY ("employeeNum") REFERENCES "Employee" ("employeeNum") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Overwrites" ("id") SELECT "id" FROM "Overwrites";
DROP TABLE "Overwrites";
ALTER TABLE "new_Overwrites" RENAME TO "Overwrites";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
