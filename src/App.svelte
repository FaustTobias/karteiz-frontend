<script lang="ts">
    import Router, { replace } from "svelte-spa-router";
    import BottomNavigation from "./components/BottomNavigation.svelte";
    import { routes } from "./routes";

    function conditionsFailed() {
        replace("/login");
    }
</script>

<Router {routes} on:conditionsFailed={conditionsFailed} />
<BottomNavigation />
