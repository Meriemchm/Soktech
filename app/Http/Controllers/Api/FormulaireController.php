<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Formulaire;
use Illuminate\Validation\ValidationException;
use App\Models\Category;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class FormulaireController extends Controller
{
    public function getFormulaireByCategoryId(Request $request, $category_id)
    {
        $formulaire = Formulaire::where('category_id', $category_id)->first();

        if ($formulaire) {
            return response()->json([
                'success' => true,
                'formulaire' => $formulaire,
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Formulaire non trouvé pour cette catégorie',
            ]);
        }
    }

    public function store(Request $request)
{
    try {
        $request->validate([
            'content' => 'required|array',
            'placeholders' => 'required|array',
            'serviceId' => 'nullable|exists:services,id',
            'category_id' => 'nullable|exists:categories,id',
        ]);

        $serviceId = $request->input('serviceId');
        $etat = $serviceId ? 'En attente' : null;

        $formData = [
            'content' => json_encode($request->input('content'), true),
            'placeholders' => json_encode($request->input('placeholders'), true),
            'category_id' => $request->input('category_id'),
            'serviceId' => $serviceId,
            'etat' => $etat,
        ];

        $formulaire = Formulaire::create($formData);

        return response()->json([
            'success' => true,
            'formulaire' => $formulaire,
        ]);
    } catch (ValidationException $e) {
        return response()->json([
            'success' => false,
            'message' => $e->errors(),
        ]);
    }
}

    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'content' => 'required',
                'category_id' => 'required|exists:categories,id',
            ]);

            $formulaire = Formulaire::findOrFail($id);
            $formulaire->update($request->all());

            return response()->json([
                'success' => true,
                'formulaire' => $formulaire,
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->errors(),
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Formulaire non trouvé',
            ]);
        }
    }

    public function destroy($id)
    {
        try {
            $formulaire = Formulaire::findOrFail($id);
            $formulaire->delete();

            return response()->json([
                'success' => true,
                'message' => 'Formulaire supprimé avec succès',
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Formulaire non trouvé',
            ]);
        }
    }

    public function getByServiceId($serviceId)
    {
        $formulaires = Formulaire::where('serviceId', $serviceId)->get();
        return response()->json($formulaires);
    }

    public function getEnAttenteFormulaires() 
{
    $formulaires = Formulaire::where('etat', 'En attente')->get();

    return response()->json($formulaires, 200);
}

public function updateEtat(Request $request, $id)
{
    $request->validate([
        'etat' => 'required|string',
    ]);

    $formulaire = Formulaire::findOrFail($id);
    $formulaire->etat = $request->input('etat');
    $formulaire->save();

    return response()->json([
        'success' => true,
        'formulaire' => $formulaire,
    ]);
}

}
