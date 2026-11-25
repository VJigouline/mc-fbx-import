# Using it in SceneEditor

[SceneEditor](https://github.com/VJigouline/SceneEditor) opens `.fbx` files, with their textures with mc-fbx-import. Drop the `.fbx` file, with its texture files or folder if the textures are not embedded.

The model is added to the scene, named after its file, and the view is refitted. A file that can't be read gives a **Failure** message, and the scene is unaffected. Warnings go to the browser console.

The model comes in metres with Y up, like the other formats. Its materials can be edited on the Materials tab like any other.
