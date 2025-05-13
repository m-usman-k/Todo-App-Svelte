<script>
	import { todos } from '$lib/todoStore.js';
	let newTodo = '';

	function addTodo() {
		const text = newTodo.trim();
		if (text) {
			todos.add(text);
			newTodo = '';
		}
	}
</script>

<style>
	.todo-app {
		max-width: 400px;
		margin: 2rem auto;
		padding: 2rem;
		border-radius: 8px;
		box-shadow: 0 2px 8px #0001;
		background: #fff;
	}
	h1 {
		text-align: center;
	}
	form {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}
	input[type="text"] {
		flex: 1;
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 4px;
	}
	button {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 4px;
		background: #0070f3;
		color: #fff;
		cursor: pointer;
	}
	button:disabled {
		background: #ccc;
		cursor: not-allowed;
	}
	ul {
		list-style: none;
		padding: 0;
	}
	li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5rem 0;
		border-bottom: 1px solid #eee;
	}
	li.done span {
		text-decoration: line-through;
		color: #888;
	}
	li button {
		background: #ff4d4f;
	}
	.clear-btn {
		margin-top: 1rem;
		width: 100%;
		background: #888;
	}
</style>

<div class="todo-app">
	<h1>Todo App</h1>
	<form on:submit|preventDefault={addTodo}>
		<input
			type="text"
			bind:value={newTodo}
			placeholder="What needs to be done?"
			autocomplete="off"
		/>
		<button type="submit" disabled={!newTodo.trim()}>Add</button>
	</form>
	<ul>
		{#each $todos as todo (todo.id)}
			<li class:done={todo.done}>
				<span on:click={() => todos.toggle(todo.id)} style="cursor:pointer;">
					{todo.text}
				</span>
				<button on:click={() => todos.remove(todo.id)}>Delete</button>
			</li>
		{/each}
	</ul>
	{#if $todos.length > 0}
		<button class="clear-btn" on:click={todos.clear}>Clear All</button>
	{/if}
</div>
