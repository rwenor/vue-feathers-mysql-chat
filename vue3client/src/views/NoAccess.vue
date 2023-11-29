<script setup></script>

<template>
    <div id="no-access-container">
        <div id="no-access-body">
            <div class="lock"></div>
            <div class="message text-center">
                <p class="display-4 mt-4">403</p>
                <h2 class="mt-1">Tilgang til denne siden er begrenset</h2>
                <p>Vennligst sjekk med nettstedadministratoren hvis du mener dette er en feil.</p>
            </div>
        </div>
    </div>
</template>
<style scoped>
* {
    position: relative;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#no-access-body {
    height: calc(100vh - 66px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom right, #eee, #d6d6d6);
}

h1 {
    margin: 40px 0 20px;
}

.lock {
    border-radius: 5px;
    width: 55px;
    height: 45px;
    background-color: #333;
    animation: dip 1s;
    animation-delay: 1.5s;
}

.lock::before,
.lock::after {
    content: '';
    position: absolute;
    border-left: 5px solid #333;
    height: 15px;
    width: 25px;
    left: calc(50% - 12.5px);
}

.lock::before {
    top: -25px;
    border: 5px solid #333;
    border-bottom-color: transparent;
    border-radius: 15px 15px 0 0;
    height: 30px;
    animation: lock 2s, spin 2s;
}

.lock::after {
    top: -15px;
    border-right: 5px solid transparent;
    animation: spin 2s;
}

@keyframes lock {
    0% {
        top: -35px;
    }

    65% {
        top: -35px;
    }

    100% {
        top: -25px;
    }
}

@keyframes spin {
    0% {
        transform: scaleX(-1);
        left: calc(50% - 30px);
    }

    65% {
        transform: scaleX(1);
        left: calc(50% - 12.5px);
    }
}

@keyframes dip {
    0% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(10px);
    }

    100% {
        transform: translateY(0px);
    }
}</style>