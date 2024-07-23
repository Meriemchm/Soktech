<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    protected $fillable = [
        'idUser',
        'titre',
        'description',
        'categorie',
        'budget',
        'image'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'idUser');
    }
}
