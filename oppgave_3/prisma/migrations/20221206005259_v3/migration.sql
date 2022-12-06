/*
  Warnings:

  - You are about to drop the column `employeeNum` on the `Overwrites` table. All the data in the column will be lost.
  - You are about to drop the column `weekId` on the `Overwrites` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_EmployeeToOverwrites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_EmployeeToOverwrites_A_fkey" FOREIGN KEY ("A") REFERENCES "Employee" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_EmployeeToOverwrites_B_fkey" FOREIGN KEY ("B") REFERENCES "Overwrites" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Overwrites" (
    "id" TEXT NOT NULL PRIMARY KEY
);
INSERT INTO "new_Overwrites" ("id") SELECT "id" FROM "Overwrites";
DROP TABLE "Overwrites";
ALTER TABLE "new_Overwrites" RENAME TO "Overwrites";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_EmployeeToOverwrites_AB_unique" ON "_EmployeeToOverwrites"("A", "B");

-- CreateIndex
CREATE INDEX "_EmployeeToOverwrites_B_index" ON "_EmployeeToOverwrites"("B");
