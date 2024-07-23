<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Service;

class Comment extends Model
{
    use HasFactory;
    protected $fillable = [
        'parentId',
        'userId',
        'serviceId',
        'username',
        'userpic',
        'body',
        'rating',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'userId');
    }

    public function service()
    {
        return $this->belongsTo(Service::class, 'serviceId');
    }

    public function parent()
    {
        return $this->belongsTo(Comment::class, 'parentId');
    }

    public function replies()
    {
        return $this->hasMany(Comment::class, 'parentId');
    }
}

