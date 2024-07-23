<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Notification;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notifications = Notification::all();
        return response()->json($notifications);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'userId' => 'required|integer|exists:users,id',
            'message' => 'required|string',
            'is_read' => 'required|boolean',
        ]);

        $notification = new Notification();
        $notification->userId = $validatedData['userId'];
        $notification->message = $validatedData['message'];
        $notification->is_read = $validatedData['is_read'];
        $notification->save();
        
        return response()->json($notification, 201);
    }

    public function update(Request $request, Notification $notification)
    {
        $validatedData = $request->validate([
            'is_read' => 'required|boolean',
        ]);

        $notification->update($validatedData);

        return response()->json($notification, 200);
    }

    public function getNotificationsByUserId(Request $request, $userId)
    {
        $notifications = Notification::where('userId', $userId)->get();
        return response()->json($notifications);
    }
    
}
