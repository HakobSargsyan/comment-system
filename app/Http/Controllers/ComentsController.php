<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;

class ComentsController extends Controller
{
    /**
     * @param Comment model
     *
     * @return model instance
     */
    public function __construct(Comment $comment){
        $this->comment = $comment;
    }

    /**
     * 
     * [
     *   return format is [{ id: id, parent_id: parent_id, description: description}]
     * ]
     * @return Array
     */
    public function index(){
    	return $this->comment->where('parent_id', null)->with('childrens')->get();
    }

    /**
     * @param Request instance
     * @return Json
     */ 
    public function addComent(Request $request){
        $inputs = $request->all()['comment'];
        $comment = [
            'description' => $inputs['description'],
            'parent_id' => isset($inputs['child']) ? $inputs['child'] : null
        ];
        $response_data = $this->comment->create($comment);
    	return response()->json(['comment' => $response_data]);
    }

}
