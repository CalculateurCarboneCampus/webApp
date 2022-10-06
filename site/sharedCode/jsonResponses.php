<?php

function dataResponseToClient(
    bool $isConnected,
    ?string $error,
    ?array $data
): array
{
    return [
        'isConnected'   => $isConnected,
        'error'         => $error,
        'data'          => $data,
    ];
}
