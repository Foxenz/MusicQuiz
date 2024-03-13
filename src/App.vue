<template>
  <header>
    <nav>
      <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/about">About</RouterLink></li>
      </ul>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped lang="scss">
nav {
  background-color: #f0f0f0;
  padding: 1rem;

  ul {
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0;

    li {
      margin: 0 1rem;

      a {
        text-decoration: none;
        color: black;

        &.router-link-active {
          font-weight: bold;
        }
      }
    }
  }
}
</style>
