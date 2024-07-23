<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::table('reponses', function (Blueprint $table) {
        $table->unsignedBigInteger('reponsesId')->nullable();
        $table->foreign('reponsesId')->references('id')->on('reponses')->onDelete('cascade');
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reponses', function (Blueprint $table) {
            $table->dropForeign(['reponsesId']);
            $table->dropColumn('reponsesId');
        });
    }
};
