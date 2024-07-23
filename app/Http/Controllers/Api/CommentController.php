<?php

namespace App\Http\Controllers\Api;

use App\Models\Comment;
use App\Models\Service;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'parentId' => 'nullable|exists:comments,id',
            'userId' => 'required|exists:users,id',
            'serviceId' => 'required|exists:services,id',
            'username' => 'required|string',
            'userpic' => 'required|string',
            'body' => 'required|string',
            'rating' => 'sometimes|nullable|integer',
        ]);

        $comment = Comment::create($validatedData);

        return response()->json($comment, 201);
    }

    public function getByServiceId($serviceId)
    {
        $comments = Comment::where('serviceId', $serviceId)->get();

        return response()->json($comments);
    }

    public function getByUserId($userId)
    {
        $comments = Comment::where('userId', $userId)->get();

        return response()->json($comments);
    }

    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);
        $comment->delete();

        return response()->json(['message' => 'Comment deleted successfully']);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'body' => 'required|string',
        ]);

        $comment = Comment::findOrFail($id);
        $comment->update($validatedData);

        return response()->json(['message' => 'Comment updated successfully', 'comment' => $comment]);
    }


}
