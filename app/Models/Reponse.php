<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reponse extends Model
{
    use HasFactory;
    protected $fillable = ['questions', 'reponses', 'serviceId', 'userId', 'etat','category_id'];
    public function category()
{
    return $this->belongsTo('App\Models\Category', 'category_id');
}

}
