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
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('parentId')->nullable();
            $table->unsignedBigInteger('userId');
            $table->unsignedBigInteger('serviceId');
            $table->string('username');
            $table->string('userpic');
            $table->text('body');
            $table->integer('rating')->nullable();
            $table->timestamps();

            $table->foreign('parentId')->references('id')->on('comments')->onDelete('cascade');
            $table->foreign('userId')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('serviceId')->references('id')->on('services')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
