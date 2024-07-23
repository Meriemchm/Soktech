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
        Schema::create('reponses', function (Blueprint $table) {
            $table->id();
            $table->string('questions')->nullable();
            $table->string('reponses')->nullable();
            $table->unsignedBigInteger('serviceId')->nullable();
            $table->unsignedBigInteger('userId')->nullable();
            $table->string('etat')->nullable();
            $table->timestamps();
    
            $table->foreign('serviceId')->references('id')->on('services')->onDelete('set null');
            $table->foreign('userId')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reponses');
    }
};
