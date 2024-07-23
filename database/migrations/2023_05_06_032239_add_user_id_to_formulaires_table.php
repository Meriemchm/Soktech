<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('formulaires', function (Blueprint $table) {
            $table->unsignedBigInteger('serviceId')->nullable();
            $table->foreign('serviceId')->references('id')->on('services')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('formulaires', function (Blueprint $table) {
            $table->dropForeign(['serviceId']);
            $table->dropColumn('serviceId');
        });
    }
};
