<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Service;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;


class ServiceController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'description' => 'required|string',
            'details' => 'required|string',
            'categorie' => 'required|string',
            'idUser' => 'required|integer',
            'image' => 'required|image',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $service = new Service();
        $service->description = $request->input('description');
        $service->details = $request->input('details');
        $service->categorie = $request->input('categorie');
        $service->idUser = $request->input('idUser');

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '.' . $image->getClientOriginalExtension();
            $path = $image->storeAs('public/services', $filename);
            $service->image = $filename;
        }

        $service->save();

        return response()->json([
            'message' => 'Le service a été créé avec succès',
            'service' => $service,
        ]);
    }

    public function storeImage(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/services', $filename);
        }

        return response()->json([
            'message' => 'Le service a été créé avec succès',
            'path' => $filename
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'description' => 'sometimes|required|string',
            'details' => 'sometimes|required|string',
            'categorie' => 'sometimes|required|string',
            'idUser' => 'sometimes|required|integer',
            'image' => 'sometimes|string',
        ]);

        $service = Service::find($id);
        

        if (!$service) {
            return response()->json(['message' => 'Service not found'], 404);
        }

        if ($request->has('description')) {
            $service->description = $request->input('description');
        }

        if ($request->has('details')) {
            $service->details = $request->input('details');
        }

        if ($request->has('categorie')) {
            $service->categorie = $request->input('categorie');
        }

        if ($request->has('idUser')) {
            $service->idUser = $request->input('idUser');
        }
        
        if ($request->has('image')) {
            $service->image = $request->input('image');
        }

        $service->save();

        return response()->json([
            'message' => 'Le service a été mis à jour avec succès',
            'service' => $service,
        ]);
    }

    public function getServicesByUserId($id)
{
    $services = Service::where('idUser', $id)->get();
    return response()->json($services);
}

    public function getServicesByCategory($category)
{
    $services = Service::where('categorie', 'LIKE', "%{$category}%")->get();
    return response()->json($services);
}


    public function destroy($id)
{
    $service = Service::find($id);

    if (!$service) {
        return response()->json(['message' => 'Service not found'], 404);
    }

    $service->delete();

    return response()->json(['message' => 'Le service a été supprimé avec succès']);
}

public function getUserIdByServiceId($id)
{
    $service = Service::find($id);

    if (!$service) {
        return response()->json(['message' => 'Service not found'], 404);
    }

    $userId = $service->idUser;

    return response()->json(['userId' => $userId]);
}

}
