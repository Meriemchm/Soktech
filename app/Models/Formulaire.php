<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Formulaire extends Model
{
    use HasFactory;

    protected $fillable = [
        'content',
        'category_id',
        'placeholders',
        'serviceId',
        'etat'
    ];

    public function category()
    {
        return $this->belongsTo('App\Models\Category');
    }

    public function service()
    {
        return $this->belongsTo('App\Models\service');
    }
}