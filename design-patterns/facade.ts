// import * as echarts from 'echarts';

interface ChartFacade {
  init(container: HTMLElement): void;
  resize(): void;
  destroy(): void;
}

class EchartsFacade implements ChartFacade {
  // private chart: echarts.ECharts;

  init(container: HTMLElement): void {
    console.log('init', container);
    // this.chart = echarts.init(container);
  }

  resize(): void {
    console.log('resize');
    // this.chart.resize();
  }

  destroy(): void {
    console.log('destroy');
    // this.chart.dispose();
  }
}

const chart = new EchartsFacade();
// just for testing
chart.init(null as unknown as HTMLElement);
chart.resize();
chart.destroy();
