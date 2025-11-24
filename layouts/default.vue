<template>
  <div>
    <header class="fixed w-full bg-white shadow-sm z-50">
      <nav class="container mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <div class="text-2xl font-bold">Portfolio</div>
          <div class="space-x-6">
            <a href="#home" class="hover:text-blue-600">Home</a>
            <a href="#about" class="hover:text-blue-600">About</a>
            <a href="#projects" class="hover:text-blue-600">Projects</a>
            <a href="#contact" class="hover:text-blue-600">Contact</a>
          </div>
        </div>
      </nav>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>
