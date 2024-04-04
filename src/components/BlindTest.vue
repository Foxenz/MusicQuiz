<template>
    <main class="flex items-center justify-center flex-col ">
        <div class="container flex-none px-12 pt-6 pb-0">
            <div class="rounded-lg bg-gray-100 p-2 text-center shadow-box font-bold text-gray-800 mb-3">
                <div>
                    <audio controls autoplay>
                        <source :src="soundUrl.sound_url" type="audio/mpeg">
                    </audio>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    props: {
        soundUrl: object,
    }
};
</script>
<style scoped>
.shadow-box {
    box-shadow: 6px 6px 18px rgba(0, 0, 0, 0.09);
}

.container {
    max-width: 900px;
}
</style>