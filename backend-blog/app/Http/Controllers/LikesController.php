<?php

namespace App\Http\Controllers;

use App\likes;
use App\Article;
use Illuminate\Http\Request;

class LikesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $likes=Likes::all();
        return $likes;  
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $likes=Likes::create($request->all());
        return response()->json($likes,201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\likes  $likes
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\likes  $likes
     * @return \Illuminate\Http\Response
     */
    public function edit(likes $likes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\likes  $likes
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, likes $likes)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\likes  $likes
     * @return \Illuminate\Http\Response
     */
    public function destroy(likes $likes)
    {
        //
    }
}
