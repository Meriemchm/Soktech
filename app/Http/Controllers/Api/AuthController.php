<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    public function sign(SignRequest $request)
    {
        $data = $request->validated();
        Log::info('Data:', $data);

        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'bio' => "modifier votre bio...",
            'photo' => "default.jpg"
        ]);
        Log::info('User:', $user->toArray());

        $token = $user->createToken('main')->plainTextToken;
        Log::info('Token:', ['token' => $token]);

        return response(compact('user', 'token'));
    }


    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Email ou mot de passe incorrect'
            ], 422);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function logout(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }

    public function storePhoto(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'photo' => 'required|image',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        if ($request->hasFile('photo')) {
            $photo = $request->file('photo');
            $filename = time() . '.' . $photo->getClientOriginalExtension();
            $photo->storeAs('public/users', $filename);
        }

        return response()->json([
            'message' => 'Le service a été créé avec succès',
            'path' => $filename
        ]);
    }

    public function updateUser(Request $request)
    {
        $request->validate([
            'name' => 'sometimes|required|string',
            'email' => 'sometimes|required|email|unique:users,email,' . Auth::id(),
            'bio' => 'sometimes|required|string',
            'address' => 'sometimes|required|string',
            'city' => 'sometimes|required|string',
            'competence' => 'sometimes|required|array|min:1',
            'diplome' => 'sometimes|required|array|min:1',
            'NumeroCarte' => 'sometimes|required|string',
            'DateExpiration' => 'sometimes|required|string',
            'NumeroSecurite' => 'sometimes|required|string',
            'Prenom' => 'sometimes|required|string',
            'NomDeFamille' => 'sometimes|required|string',
            'photo' => 'sometimes|required|string',
        ]);

        $user = Auth::user();
        
        if ($request->has('name')) {
            $user->name = $request->input('name');
        }

        if ($request->has('email')) {
            $user->email = $request->input('email');
        }

        if ($request->has('bio')) {
            $user->bio = $request->input('bio');
        }

        if ($request->has('address')) {
            $user->address = $request->input('address');
        }

        if ($request->has('city')) {
            $user->city = $request->input('city');
        }

        if ($request->has('competence')) {
            $user->competence = json_encode($request->input('competence'));
        }

        if ($request->has('diplome')) {
            $user->diplome = json_encode($request->input('diplome'));
        }

        if ($request->has('NumeroCarte')) {
            $user->NumeroCarte = json_encode($request->input('NumeroCarte'));
        }

        if ($request->has('DateExpiration')) {
            $user->DateExpiration = json_encode($request->input('DateExpiration'));
        }

        if ($request->has('NumeroSecurite')) {
            if (is_numeric($request->NumeroSecurite)) {
                $user->NumeroSecurite = intval($request->NumeroSecurite);
            } else {
                return response()->json(['error' => 'Invalid NumeroSecurite value'], 400);
            }
        }

        if ($request->has('Prenom')) {
            $user->Prenom = json_encode($request->input('Prenom'));
        }

        if ($request->has('NomDeFamille')) {
            $user->NomDeFamille = json_encode($request->input('NomDeFamille'));
        }

        if ($request->has('photo')) {
            $user->photo = $request->input('photo');
        }

        $user->save();

        return response()->json([
            'message' => 'Les informations professionnelles ont été mises à jour avec succès',
        ]);
    }

    public function getPhotoByUserId($id)
{
    $user = User::find($id);

    if ($user) {
        $photo = $user->photo;
        $name = $user->name;

        return response()->json([
            'photo' => $photo,
            'userName' => $name
        ]);
    } else {
        return response()->json([
            'message' => 'User not found'
        ], 404);
    }
}

    public function getUserById($id)
    {
        $user = user::where('id', $id)->get();
        return response()->json($user);
    }


}
