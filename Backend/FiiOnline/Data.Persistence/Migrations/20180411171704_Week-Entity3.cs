using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Data.Persistence.Migrations
{
    public partial class WeekEntity3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Files_Lessons_LessonId",
                table: "Files");

            migrationBuilder.DropForeignKey(
                name: "FK_Lessons_Weeks_WeekId",
                table: "Lessons");

            migrationBuilder.DropForeignKey(
                name: "FK_UserCourses_Courses_CourseId",
                table: "UserCourses");

            migrationBuilder.DropForeignKey(
                name: "FK_UserCourses_AspNetUsers_ProfessorId",
                table: "UserCourses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserCourses",
                table: "UserCourses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Lessons",
                table: "Lessons");

            migrationBuilder.RenameTable(
                name: "UserCourses",
                newName: "ProfessorCourses");

            migrationBuilder.RenameTable(
                name: "Lessons",
                newName: "Resources");

            migrationBuilder.RenameIndex(
                name: "IX_UserCourses_CourseId",
                table: "ProfessorCourses",
                newName: "IX_ProfessorCourses_CourseId");

            migrationBuilder.RenameIndex(
                name: "IX_Lessons_WeekId",
                table: "Resources",
                newName: "IX_Resources_WeekId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProfessorCourses",
                table: "ProfessorCourses",
                columns: new[] { "ProfessorId", "CourseId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Resources",
                table: "Resources",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Files_Resources_LessonId",
                table: "Files",
                column: "LessonId",
                principalTable: "Resources",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProfessorCourses_Courses_CourseId",
                table: "ProfessorCourses",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProfessorCourses_AspNetUsers_ProfessorId",
                table: "ProfessorCourses",
                column: "ProfessorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Resources_Weeks_WeekId",
                table: "Resources",
                column: "WeekId",
                principalTable: "Weeks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Files_Resources_LessonId",
                table: "Files");

            migrationBuilder.DropForeignKey(
                name: "FK_ProfessorCourses_Courses_CourseId",
                table: "ProfessorCourses");

            migrationBuilder.DropForeignKey(
                name: "FK_ProfessorCourses_AspNetUsers_ProfessorId",
                table: "ProfessorCourses");

            migrationBuilder.DropForeignKey(
                name: "FK_Resources_Weeks_WeekId",
                table: "Resources");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Resources",
                table: "Resources");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProfessorCourses",
                table: "ProfessorCourses");

            migrationBuilder.RenameTable(
                name: "Resources",
                newName: "Lessons");

            migrationBuilder.RenameTable(
                name: "ProfessorCourses",
                newName: "UserCourses");

            migrationBuilder.RenameIndex(
                name: "IX_Resources_WeekId",
                table: "Lessons",
                newName: "IX_Lessons_WeekId");

            migrationBuilder.RenameIndex(
                name: "IX_ProfessorCourses_CourseId",
                table: "UserCourses",
                newName: "IX_UserCourses_CourseId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Lessons",
                table: "Lessons",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserCourses",
                table: "UserCourses",
                columns: new[] { "ProfessorId", "CourseId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Files_Lessons_LessonId",
                table: "Files",
                column: "LessonId",
                principalTable: "Lessons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Lessons_Weeks_WeekId",
                table: "Lessons",
                column: "WeekId",
                principalTable: "Weeks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserCourses_Courses_CourseId",
                table: "UserCourses",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserCourses_AspNetUsers_ProfessorId",
                table: "UserCourses",
                column: "ProfessorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
