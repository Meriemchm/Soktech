<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;


class ProjectController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'titre' => 'required|string',
            'description' => 'required|string',
            'details' => 'required|string',
            'categorie' => 'required|string',
            'budget' => 'required|numeric',
            'idUser' => 'required|integer',
            'image' => 'required|image',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $project = new Project();
        $project->titre = $request->input('titre');
        $project->description = $request->input('description');
        $project->details = $request->input('details');
        $project->categorie = $request->input('categorie');
        $project->budget = $request->input('budget');
        $project->idUser = $request->input('idUser');

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '.' . $image->getClientOriginalExtension();
            $path = $image->storeAs('public/projects', $filename);
            $project->image = $filename;
        }

        $project->save();

        return response()->json([
            'message' => 'Le project a été créé avec succès',
            'project' => $project,
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
            $image->storeAs('public/projects', $filename);
        }

        return response()->json([
            'message' => 'Le project a été créé avec succès',
            'path' => $filename
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'titre' => 'sometimes|required|string',
            'description' => 'sometimes|required|string',
            'details' => 'sometimes|required|string',
            'categorie' => 'sometimes|required|string',
            'prix' => 'sometimes|required|numeric',
            'idUser' => 'sometimes|required|integer',
            'image' => 'sometimes|string',
        ]);

        $project = Project::find($id);
        

        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        if ($request->has('titre')) {
            $project->titre = $request->input('titre');
        }

        if ($request->has('description')) {
            $project->description = $request->input('description');
        }

        if ($request->has('details')) {
            $project->details = $request->input('details');
        }

        if ($request->has('categorie')) {
            $project->categorie = $request->input('categorie');
        }

        if ($request->has('prix')) {
            $project->prix = $request->input('prix');
        }

        if ($request->has('idUser')) {
            $project->idUser = $request->input('idUser');
        }
        
        if ($request->has('image')) {
            $project->image = $request->input('image');
        }

        $project->save();

        return response()->json([
            'message' => 'Le project a été mis à jour avec succès',
            'project' => $project,
        ]);
    }

    public function getProjectsByUserId($id)
    {
        $projects = Project::where('idUser', $id)->get();
        return response()->json($projects);
    }

    public function getAllProjects()
    {
        $projects = Project::get();
        return response()->json($projects);
    }


    public function destroy($id)
    {
        $project = project::find($id);

        if (!$project) {
            return response()->json(['message' => 'project not found'], 404);
        }

        $project->delete();

        return response()->json(['message' => 'Le projet a été supprimé avec succès']);
    }
}
