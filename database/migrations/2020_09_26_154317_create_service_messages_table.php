<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateServiceMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('service_messages', function (Blueprint $table) {
            $table->id();
            $table->text('content');
            $table->dateTime('expires_at', 0);
            $table->foreignId('user_id')->nullable();
            $table->foreignId('attraction_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('service_messages');
    }
}
