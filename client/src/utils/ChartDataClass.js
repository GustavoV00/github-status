export default class chartData {
  construcotr(labels, label, data, backgroundColor, borderColor, borderWidth) {
    this.labels = labels;
    this.label = label;
    this.data = data;
    this.backgroundColor = backgroundColor;
    this.borderColor = borderColor;
    this.borderWidth = borderWidth || 1;
  }

  generateChartData() {
    const chart = {
      data: {
        datasets: {
          labels: this.labels,
          data: this.data,
          backgroundColor: this.backgroundColor,
          borderColor: this.borderColor,
          borderWidth: 1,
        },
      },
    };
    return chart;
  }
}
