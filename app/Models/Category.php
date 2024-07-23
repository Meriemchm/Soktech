<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    public function formulaires()
    {
        return $this->hasMany(Formulaire::class);
    }
    public function reponses()
{
    return $this->hasMany('App\Models\Reponse', 'category_id');
}

    public function parentReponse()
    {
        return $this->belongsTo(Reponse::class, 'reponsesId');
    }

    public function childReponses()
    {
        return $this->hasMany(Reponse::class, 'reponsesId');
    }

}

