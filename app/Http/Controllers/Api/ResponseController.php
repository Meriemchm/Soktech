<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Reponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;


class ResponseController extends Controller
{
    public function store(Request $request)
{
    $validatedData = $request->validate([
        'questions' => 'nullable|array',
        'reponses' => 'nullable|array',
        'serviceId' => 'nullable|integer',
        'userId' => 'nullable|integer',
        'etat' => 'nullable|string',
        'category_id' => 'nullable|integer|exists:categories,id',
        'reponsesId' => 'nullable|integer|exists:reponses,id',
    ]);

    $reponse = new Reponse();
    $reponse->questions = json_encode($validatedData['questions']);
    $reponse->reponses = json_encode($validatedData['reponses']);
    $reponse->serviceId = $validatedData['serviceId'] ?? null; // Use null coalescing operator here
    $reponse->userId = $validatedData['userId'] ?? null; // Use null coalescing operator here
    $reponse->etat = $validatedData['etat'] ?? 'En attente';
    $reponse->category_id = $validatedData['category_id'] ?? null;
    $reponse->reponsesId = $validatedData['reponsesId'] ?? null;
    $reponse->save();

    return response()->json($reponse, 201);
}

public function update(Request $request, Reponse $reponse)
{
    $validatedData = $request->validate([
        'question' => 'nullable|string',
        'reponse' => 'nullable|string',
        'serviceId' => 'nullable|integer',
        'userId' => 'nullable|integer',
        'etat' => 'nullable|string',
        'reponsesId' => 'nullable|integer|exists:reponses,id',
        'category_id' => 'nullable|integer|exists:categories,id',
    ]);

    $reponse->update($validatedData);

    return response()->json($reponse, 200);
}

    public function destroy(Reponse $reponse)
    {
        $reponse->delete();

        return response()->json(null, 204);
    }

    public function showByServiceId($serviceId)
{
    $reponses = Reponse::where('serviceId', $serviceId)->get();
    return response()->json($reponses);
}

public function showByUserId($userId)
{
    $reponses = Reponse::where('userId', $userId)->get();
    return response()->json($reponses);
}

public function showByCategoryId($categoryId)
{
    $reponses = Reponse::where('categoryId', $categoryId)->get();
    return response()->json($reponses);
}



public function show($id)
{
    $reponse = Reponse::findOrFail($id);
    return response()->json($reponse);
}

public function getPendingResponses()
{
    Log::info('getPendingResponses called');

    $reponses = Reponse::where('etat', 'En attente')
                         ->whereNotNull('serviceId')
                         ->get();

    Log::info('Pending responses:', ['responses' => $reponses->toArray()]);

    return response()->json($reponses, 200);
}


public function getAllResponses()
{
    $reponses = Reponse::get();
    return response()->json($reponses);
}

public function getEnAttenteResponses() 
{
    $reponses = Reponse::where('etat', 'En attente')
    ->whereNotNull('category_id')
    ->get();

Log::info('Pending responses:', ['responses' => $reponses->toArray()]);

return response()->json($reponses, 200);
}
public function updateEtat(Request $request, $id)
{
    $request->validate([
        'etat' => 'required|string',
    ]);

    $reponses = Reponse::findOrFail($id);
    $reponses->etat = $request->input('etat');
    $reponses->save();

    return response()->json([
        'success' => true,
        'responses' => $reponses,
    ]);
}


}
