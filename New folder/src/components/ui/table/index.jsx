import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { FaPlay, FaPause, FaVolumeUp } from 'react-icons/fa';
import './styles.css';
import { Buttons, Button} from "../elements/index";

export const Table = ({ headers, data }) => {
    const waveformRefs = useRef({});
    const wavesurferRefs = useRef({});
    const [selectedRow, setSelectedRow] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState('0:00');

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s < 10 ? '0' + s : s}`;
    };

    const cleanupWaveSurfer = () => {
        Object.values(wavesurferRefs.current).forEach((instance) => {
            instance?.destroy();
        });
        wavesurferRefs.current = {};
    };

    const handlePlayClick = (fileName, rowIndex) => {
        const audioUrl = `/audios/${fileName}`;

        // If clicked again on the same row, toggle play/pause
        if (selectedRow === rowIndex) {
            const currentPlayer = wavesurferRefs.current[rowIndex];
            if (currentPlayer) {
                currentPlayer.playPause();
                setIsPlaying(currentPlayer.isPlaying());
            }
            return;
        }

        // New row selected
        setSelectedRow(rowIndex);
        setIsPlaying(false);
        setDuration('0:00');

        setTimeout(() => {
            if (!waveformRefs.current[rowIndex]) return;

            cleanupWaveSurfer();

            const wavesurfer = WaveSurfer.create({
                container: waveformRefs.current[rowIndex],
                waveColor: '#ccc',
                progressColor: '#a82828',
                barWidth: 2,
                height: 48,
                responsive: true,
            });

            wavesurferRefs.current[rowIndex] = wavesurfer;

            wavesurfer.load(audioUrl);

            wavesurfer.on('ready', () => {
                setDuration(formatTime(wavesurfer.getDuration()));
                wavesurfer.play();
                setIsPlaying(true);
            });

            wavesurfer.on('finish', () => {
                setIsPlaying(false);
            });
        }, 0);
    };

    const handleAction = (rowIndex) => {
        console.log(`Action clicked on row ${rowIndex}`);
    };
    return (<>
        <div className="table-container">
            <table className="custom-table">
                <thead>
                    <tr>
                        {headers.map((header, i) => (
                            <th key={i} className="table-header-cell">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rIndex) => (
                        <React.Fragment key={rIndex}>
                            <tr>
                                {row.map((cell, cIndex) => {
                                    if (cIndex === 1) {
                                        return (
                                            <td key={cIndex} className="table-body-cell audio-cell">{cell}</td>
                                        );
                                    } else if (cIndex === 5) {
                                        return (
                                            <td key={cIndex} className="table-body-cell">
                                                <button
                                                    className="icon-button play-button"
                                                    onClick={() => handlePlayClick(row[1], rIndex)}
                                                >
                                                    <FaPlay />
                                                </button>
                                            </td>
                                        );
                                    } else if (cIndex === 6) {
                                        return (
                                            <td key={cIndex} className="table-body-cell">
                                                <Buttons
                                                    className="action-button"
                                                    onClick={() => handleAction(rIndex)}
                                                >{cell}
                                                </Buttons>
                                            </td>
                                        );
                                    } else {
                                        return (
                                            <td key={cIndex} className="table-body-cell">{cell}</td>
                                        );
                                    }
                                })}
                            </tr>

                            {/* 👇 Media Player Row */}
                            {selectedRow === rIndex && (
                                <tr>
                                    <td colSpan={headers.length}>
                                        <div className="audio-player-popup">
                                            {/* 👇 Close button */}
                                            <button
                                                className="audio-close-button"
                                                onClick={() => {
                                                    const current = wavesurferRefs.current[rIndex];
                                                    current?.pause(); // optional
                                                    setSelectedRow(null);
                                                    setIsPlaying(false);
                                                    setDuration('0:00');
                                                }}
                                            >
                                                ✕
                                            </button>

                                            {/* Controls */}
                                            <button
                                                className="audio-control-button"
                                                onClick={() => {
                                                    const current = wavesurferRefs.current[rIndex];
                                                    if (current) {
                                                        current.playPause();
                                                        setIsPlaying(current.isPlaying());
                                                    }
                                                }}
                                            >
                                                {isPlaying ? <FaPause /> : <FaPlay />}
                                            </button>

                                            <div
                                                className="waveform"
                                                ref={(el) => (waveformRefs.current[rIndex] = el)}
                                            ></div>

                                            <div className="audio-meta">
                                                <span className="audio-duration">{duration}</span>
                                                <FaVolumeUp className="volume-icon" />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}

                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    </>
    );
};