<template>
    <div>
        <h1 class="text-3xl font-bold underline text-amber-300">
            Hello world!
        </h1>
        <button class="btn btn-primary">Button</button>
        <button class="btn btn-neutral">Neutral</button>
        <button class="btn btn-primary">Primary</button>
        <button class="btn btn-secondary">Secondary</button>
        <button class="btn btn-accent">Accent</button>
        <button class="btn btn-info">Info</button>
        <button class="btn btn-success">Success</button>
        <button class="btn btn-warning">Warning</button>
        <button class="btn btn-error">Error</button>

        <details class="dropdown">
            <summary class="btn m-1">open or close</summary>
            <ul
                class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
                <li><a>Item 1</a></li>
                <li><a>Item 2</a></li>
            </ul>
        </details>
    </div>
</template>
