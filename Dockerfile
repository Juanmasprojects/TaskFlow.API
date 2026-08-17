FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY TaskFlow.API/TaskFlow.API.csproj TaskFlow.API/
COPY TaskFlow.Application/TaskFlow.Application.csproj TaskFlow.Application/
COPY TaskFlow.Core/TaskFlow.Core.csproj TaskFlow.Core/
COPY TaskFlow.Infrastructure/TaskFlow.Infrastructure.csproj TaskFlow.Infrastructure/

RUN dotnet restore TaskFlow.API/TaskFlow.API.csproj

COPY . .

RUN dotnet publish TaskFlow.API/TaskFlow.API.csproj \
    -c Release \
    -o /app/publish \
    --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app

COPY --from=build /app/publish .

ENV ASPNETCORE_HTTP_PORTS=10000

EXPOSE 10000

ENTRYPOINT ["dotnet", "TaskFlow.API.dll"]