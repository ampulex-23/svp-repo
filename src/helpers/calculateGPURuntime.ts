export type EngineData = [number, 0 | 1];
export interface EngineRuntimeResult {
    totalRuntime: string;
    milestoneTimes: { [key: number]: number };
}

function calculateEngineRuntime(series: EngineData[]): EngineRuntimeResult {
    let totalRuntime = 0; // Полный пробег в моточасах
    const milestones = [10000, 20000, 30000, 40000]; // Целевые значения пробега
    const milestoneTimes: { [key: number]: number } = {}; // Объект для хранения времени достижения целевых значений пробега
    let currentMilestoneIndex = 0; // Индекс текущего целевого значения пробега
    let lastStartMinute: number | null = null; // Последняя минута включения двигателя
    const lastMinute = series[series.length - 1][0]; // Последняя минута в данных

    for (let i = 0; i < series.length; i++) {
        const [minute, state] = series[i];

        if (state === 1) {
            // Двигатель включен
            lastStartMinute = minute;
        } else if (state === 0 && lastStartMinute !== null) {
            // Двигатель выключен, считаем интервал работы
            const runtime = (minute - lastStartMinute) / 60; // Интервал работы в моточасах
            totalRuntime += runtime;

            // Проверяем, достигли ли мы текущего целевого значения пробега
            while (currentMilestoneIndex < milestones.length && totalRuntime >= milestones[currentMilestoneIndex]) {
                milestoneTimes[milestones[currentMilestoneIndex]] = minute;
                currentMilestoneIndex++;
            }

            lastStartMinute = null; // Сбрасываем последнюю минуту включения
        }
    }

    // Если двигатель был включен в последней записи и не был выключен до конца массива
    if (lastStartMinute !== null) {
        const runtime = (lastMinute - lastStartMinute) / 60;
        totalRuntime += runtime;

        // Проверяем, достигли ли мы текущего целевого значения пробега
        while (currentMilestoneIndex < milestones.length && totalRuntime >= milestones[currentMilestoneIndex]) {
            milestoneTimes[milestones[currentMilestoneIndex]] = lastMinute;
            currentMilestoneIndex++;
        }
    }

    // Прогнозируем время достижения оставшихся целевых значений пробега
    const averageRuntimePerMinute = totalRuntime / lastMinute;
    while (currentMilestoneIndex < milestones.length) {
        const remainingRuntime = milestones[currentMilestoneIndex] - totalRuntime;
        const estimatedMinutes = remainingRuntime / averageRuntimePerMinute;
        milestoneTimes[milestones[currentMilestoneIndex]] = Math.round(lastMinute + estimatedMinutes);
        currentMilestoneIndex++;
    }

    return {
        totalRuntime: totalRuntime.toFixed(0),
        milestoneTimes: milestoneTimes
    };
}

export default calculateEngineRuntime;