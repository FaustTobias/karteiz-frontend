<script lang="ts">
    import { push } from "svelte-spa-router";
    import { getStore } from "svex";

    getStore("user.name").set("");
    push("/");
</script>
