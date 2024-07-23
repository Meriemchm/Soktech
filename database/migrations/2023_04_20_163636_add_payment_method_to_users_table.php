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
        Schema::table('users', function (Blueprint $table) {
            $table->string('NumeroCarte')->nullable();
            $table->string('DateExpiration')->nullable();
            $table->integer('NumeroSecurite')->nullable();
            $table->string('Prenom')->nullable();
            $table->string('NomDeFamille')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('NumeroCarte');
            $table->dropColumn('DateExpiration');
            $table->dropColumn('NumeroSecurite');
            $table->dropColumn('Prenom');
            $table->dropColumn('NomDeFamille');
        });
    }
};
