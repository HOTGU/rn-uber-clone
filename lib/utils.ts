export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();

  const month = date.getMonth() + 1 + "월";
  const year = date.getFullYear();

  return `${day < 10 ? "0" + day : day} ${month} ${year}`;
}

export function formatTime(minutes: number): string {
  const formattedMinutes = +minutes?.toFixed(0) || 0;

  if (formattedMinutes < 60) {
    return `${minutes} 분`;
  } else {
    const hours = Math.floor(formattedMinutes / 60);
    const remainingMinutes = formattedMinutes % 60;
    return `${hours}시간 ${remainingMinutes}분`;
  }
}
